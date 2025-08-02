export interface PricingData {
    id: string;
    type: string;
    price: string;
    duration: string;
    discount: string;
  }
  
  export const monthlyPricingData: PricingData[] = [
    { id: "1", type: "Basic", price: "$21", duration: "/month", discount: "Save 20%" },
    { id: "2", type: "Popular", price: "$19", duration: "/month", discount: "Save 20%" },
    { id: "3", type: "Standard", price: "$19", duration: "/month", discount: "Save 20%" },
  ];
  
  export const yearlyPricingData: PricingData[] = [
    { id: "1", type: "Basic", price: "$224", duration: "/yearly", discount: "Save 20%" },
    { id: "2", type: "Popular", price: "$179", duration: "/yearly", discount: "Save 20%" },
    { id: "3", type: "Standard", price: "$129", duration: "/yearly", discount: "Save 20%" },
  ];
  