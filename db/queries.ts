import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { challengeProgress, courses, units, userProgress } from "./schema";

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  return data;
});

// создаю функцию, которая асинхронно получает данные о курсах из БД. Функция обёртнута в функцию cache из реакта, для кеширования результата выполнения
export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();

  return data;
});

export const getUnits = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  // Если нет актуального курса, то пустой массив
  if (!userId || !userProgress?.activeCourseId) {
    return [];
  }

  // TODO: Confirm order is needed
  const data = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              // надо чтобы челледжпрогресс.юзерАйди был эквивалентен юзерАйди, который я ожидаю от auth()
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessonWithCompletedStatus = unit.lessons.map((lesson) => {
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        // All completed lessons for individual lesson
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed)
        );
      });

      // Если в конкретном уроке все челленджи завершены, то возвращаем этот урок в виде завершенного
      return { ...lesson, completed: allCompletedChallenges };
    });
    return { ...unit, lessons: lessonWithCompletedStatus };
  });
  return normalizedData;
});

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    // TODO: Populate units and lessons
  });

  return data;
});
