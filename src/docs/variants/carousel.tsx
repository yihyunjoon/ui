import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/registry/base-nova/ui/carousel";

export default function Example() {
  return (
    <Carousel opts={{ loop: true }} className="w-48 sm:w-64">
      <CarouselContent>
        {[1, 2, 3].map((number) => (
          <CarouselItem key={number}>
            <div className="flex h-32 items-center justify-center rounded-lg bg-muted text-3xl font-semibold">
              {number}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
