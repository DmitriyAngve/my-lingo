"use client";

import { useState } from "react";

import { challenges, challengeOptions } from "@/db/schema";

import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  userSubscription: any; // TODO: replace with subscription DB type
};

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonChallenges,
  initialLessonId,
  userSubscription,
}: Props) => {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );

    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  // Для контролирования какой челлендж в данный момент активен
  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12 ">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700 mt-[50%]">
              {title}
            </h1>
            {/* <div className="flex flex-col items-center"> */}
            {challenge.type === "ASSIST" && (
              <QuestionBubble question={challenge.question} />
            )}
            {/* </div> */}
            <Challenge
              options={options}
              onSelect={() => {}}
              status="wrong"
              selectedOption={undefined}
              disabled={false}
              type={challenge.type}
            />
          </div>
        </div>
      </div>
    </>
  );
};
