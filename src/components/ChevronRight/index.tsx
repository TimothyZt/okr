import React from "react";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";

export default function ChevronRight() {

  const content = (
    <PopoverContent>
      <div className="px-1 py-2">
        <div className="text-small font-bold">Popover Content</div>
        <div className="text-tiny">This is the popover content</div>
      </div>
    </PopoverContent>
  );
  const placements = [
    "top-start",
    "top",
    "top-end",
    "bottom-start",
    "bottom",
    "bottom-end",
    "right-start",
    "right",
    "right-end",
    "left-start",
    "left",
    "left-end",
  ];
  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Button>
        <svg width="20px" height="20px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)">
        <g id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(1.92,1.92), scale(0.84)">
        <rect x="0" y="0" width="24.00" height="24.00" rx="12" fill="#00ad79"/>
        </g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
        <g id="SVGRepo_iconCarrier"> <path d="M9 6L15 12L9 18" stroke="#fafafa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> </g>
        </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 bg-gray shadow-2xl">
        <div className="flex flex-wrap  md:grid-cols-3 gap-4">

        <Popover placement="left" color="secondary">
          <PopoverTrigger>
            <Button color="success" variant="flat" className="capitalize">
              更新
            </Button>
          </PopoverTrigger>
          {content}
        </Popover>

    

        <Popover key="left" placement="left" color="secondary">
          <PopoverTrigger>
            <Button color="success" variant="flat" className="capitalize">
              删除
            </Button>
          </PopoverTrigger>
          {content}
        </Popover>
    
    </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
