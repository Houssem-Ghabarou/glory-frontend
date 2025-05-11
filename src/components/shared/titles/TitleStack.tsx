import { titleClass } from "@/lib/tailwind/classNames";

interface TitleStackProps {
  words: string[];
  className?: string;
}

const TitleStack = ({
  words = [],
  className = "",
}: TitleStackProps & { className?: string }) => {
  return (
    <div>
      {words.map((word, index) => (
        <h1 key={index} className={className || titleClass}>
          {word}
        </h1>
      ))}
    </div>
  );
};

export default TitleStack;
