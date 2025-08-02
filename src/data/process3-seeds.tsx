export interface ProcessStep {
    id: string;
    step: string;
    title: string;
    description: string;
    image: string;
  }
  
  export const processSteps: ProcessStep[] = [
    {
      id: "Planning",
      step: "Step 1",
      title: "Meeting clients & planning concept",
      description:
        "Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia.",
      image: "/img/process/1-1.jpg",
    },
    {
      id: "Collection",
      step: "Step 2",
      title: "Testing material with equipment",
      description:
        "Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia.",
      image: "/img/process/1-2.jpg",
    },
    {
      id: "Implementation",
      step: "Step 3",
      title: "Installation Roofing Service Smoothly",
      description:
        "Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia.",
      image: "/img/process/1-3.jpg",
    },
  ];
  