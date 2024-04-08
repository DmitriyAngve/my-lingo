import { cache } from "react";
import db from "./drizzle";

// создаю функцию, которая асинхронно получает данные о курсах из БД. Функция обёртнута в функцию cache из реакта, для кеширования результата выполнения
export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();

  return data;
});
