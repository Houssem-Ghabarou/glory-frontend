import { titleClass } from "@/lib/tailwind/classNames";

interface TitleStackProps {
  words: string[];
  className?: string;
  main?: boolean;
}

const TitleStack = ({
  words = [],
  className = "",
  main = false,
}: TitleStackProps & { className?: string }) => {
  return (
    <div>
      {words.map((word, index) => (
        <h2 key={index} className={className || titleClass}>
          {word}
        </h2>
      ))}
    </div>
  );
};

export default TitleStack;
