type Props = {
  children: React.ReactNode;
};

const LessonLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full w-full">{children}</div>
    </div>
    // <div className="flex flex-col h-full">
    //   <div className="flex flex-col h-full w-full">
    //     <div className="flex flex-col items-center">{children}</div>
    //   </div>
    // </div>
  );
};

export default LessonLayout;
