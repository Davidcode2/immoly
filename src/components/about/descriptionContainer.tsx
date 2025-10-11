import AnimatedImage from "./animatedImage";

type PropTypes = {
  image: {
    src: { src: string; height: number; width: number };
    alt: string;
  };
  children: React.ReactNode;
};

export default function DescriptionContainer({ image, children }: PropTypes) {
  return (
    <div className="mt-40 grid-cols-10 gap-x-20 lg:grid lg:gap-y-96">
      <div className="col-span-7 col-start-3 col-end-10 row-span-full">
        <AnimatedImage image={image} />
      </div>
      <div className="col-span-4 col-start-1 row-start-1 flex flex-col justify-between gap-y-60 lg:min-h-[200vh]">
        {children}
      </div>
    </div>
  );
}
