"use client";

import { ExpandableTabs } from "@/components/expandable-tabs";
import { cn } from "@optima/ui/cn";
import { ToggleGroup, ToggleGroupItem } from "@optima/ui/toggle-group";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  GridTableIcon,
  Layout2ColumnIcon,
  LeftToRightListDashIcon,
} from "hugeicons-react";
import { useCalendarContext } from "../../calendar-context";
import { calendarModeIconMap } from "../../calendar-mode-icon-map";
import { type Mode, calendarModes } from "../../calendar-types";

export default function CalendarHeaderActionsMode() {
  const { mode, setMode } = useCalendarContext();

  return (
    <ExpandableTabs
      tabs={[
        { title: "Day", icon: LeftToRightListDashIcon },
        { title: "Week", icon: Layout2ColumnIcon },
        { title: "Month", icon: GridTableIcon },
      ]}
      selectedIndex={calendarModes.indexOf(mode)}
      onChange={(index) => {
        if (index !== undefined) setMode(calendarModes[index] as Mode);
      }}
    />
  );

  // return (
  //   <LayoutGroup>
  //     <ToggleGroup
  //       className="flex gap-0 -space-x-px rounded-sm border overflow-hidden shadow-sm shadow-black/5 rtl:space-x-reverse"
  //       type="single"
  //       variant="outline"
  //       value={mode}
  //       onValueChange={(value) => {
  //         if (value) setMode(value as Mode);
  //       }}
  //     >
  //       {calendarModes.map((modeValue) => {
  //         const isSelected = mode === modeValue;
  //         return (
  //           <motion.div
  //             key={modeValue}
  //             layout
  //             className="flex-1 flex divide-x"
  //             animate={{ flex: isSelected ? 1.6 : 1 }}
  //             transition={{
  //               flex: {
  //                 type: "spring",
  //                 stiffness: 400,
  //                 damping: 30,
  //               },
  //             }}
  //           >
  //             <ToggleGroupItem
  //               value={modeValue}
  //               className={cn(
  //                 "w-full rounded-none shadow-none focus-visible:z-10 text-base flex items-center justify-center gap-2 relative border-none",
  //                 isSelected && "z-10",
  //               )}
  //             >
  //               <motion.div
  //                 layout
  //                 className="flex items-center justify-center gap-2 py-2 px-3"
  //                 initial={false}
  //                 animate={{
  //                   scale: isSelected ? 1 : 0.95,
  //                 }}
  //                 transition={{
  //                   scale: {
  //                     type: "spring",
  //                     stiffness: 400,
  //                     damping: 30,
  //                   },
  //                   layout: {
  //                     type: "spring",
  //                     stiffness: 400,
  //                     damping: 30,
  //                   },
  //                 }}
  //               >
  //                 <motion.div
  //                   layout="position"
  //                   initial={false}
  //                   animate={{
  //                     scale: isSelected ? 0.9 : 1,
  //                   }}
  //                   transition={{
  //                     scale: {
  //                       type: "spring",
  //                       stiffness: 400,
  //                       damping: 30,
  //                     },
  //                   }}
  //                 >
  //                   {calendarModeIconMap[modeValue]}
  //                 </motion.div>
  //                 <AnimatePresence mode="popLayout">
  //                   {isSelected && (
  //                     <motion.p
  //                       layout="position"
  //                       key={`text-${modeValue}`}
  //                       className="font-medium origin-left whitespace-nowrap"
  //                       initial={{
  //                         opacity: 0,
  //                         x: -2,
  //                         scale: 0.95,
  //                       }}
  //                       animate={{
  //                         opacity: 1,
  //                         x: 0,
  //                         scale: 1,
  //                         transition: {
  //                           type: "spring",
  //                           stiffness: 400,
  //                           damping: 30,
  //                           opacity: { duration: 0.15 },
  //                         },
  //                       }}
  //                       exit={{
  //                         opacity: 0,
  //                         x: -2,
  //                         scale: 0.95,
  //                         transition: {
  //                           type: "spring",
  //                           stiffness: 400,
  //                           damping: 30,
  //                           opacity: { duration: 0.1 },
  //                         },
  //                       }}
  //                     >
  //                       {modeValue.charAt(0).toUpperCase() + modeValue.slice(1)}
  //                     </motion.p>
  //                   )}
  //                 </AnimatePresence>
  //               </motion.div>
  //             </ToggleGroupItem>
  //           </motion.div>
  //         );
  //       })}
  //     </ToggleGroup>
  //   </LayoutGroup>
  // );
}
