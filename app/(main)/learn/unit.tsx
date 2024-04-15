import { lessons, units } from "@/db/schema";

type Props = {
  id: number;
  order: number;
  title: string;
  desciption: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[]; // комплексный тип данных, который берется из schema. Все это вместо будет массивом
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | undefined;
  activeLessonPercentage: number;
};

const unit = () => {
  return <div></div>;
};

export default unit;
