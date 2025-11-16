// "use client";
// import { useState } from "react";
// import {
//   Box,
//   Divider,
//   SwipeableDrawer,
//   Typography,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
// } from "@mui/material";
// import Image from "next/image";

// export default function FormTypeDrawer({
//   value,
//   onChange,
// }: {
//   value: string;
//   onChange: (val: string) => void;
// }) {
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const handleDrawerOpen = () => setDrawerOpen(true);
//   const handleDrawerClose = () => setDrawerOpen(false);

//   const handleSelect = (val: string) => {
//     onChange(val);
//     handleDrawerClose();
//   };

//   return (
//     <>
//       {/* Trigger */}
//       <div
//         className="flex justify-between items-center border rounded px-3 py-3 cursor-pointer"
//         onClick={handleDrawerOpen}
//         >
//         <p className={`text-sm ${value ? "text-black" : "text-gray-400"}`}>
//             {value || "Select form type"}
//         </p>
//         <Image
//             src="/icons/chevron-down.svg"
//             alt="Dropdown"
//             width={16}
//             height={16}
//             className="ml-2"
//         />
//         </div>

//       {/* Bottom Sheet */}
//       <SwipeableDrawer
//         anchor="bottom"
//         open={drawerOpen}
//         onClose={handleDrawerClose}
//         onOpen={handleDrawerOpen}
//         PaperProps={{
//           sx: {
//             borderTopLeftRadius: 20,
//             borderTopRightRadius: 20,
//             maxHeight: "70vh",
//           },
//         }}
//       >
//         <Box sx={{ p: 2 }}>
//           {/* Handle bar */}
//           <Box
//             sx={{
//               width: 40,
//               height: 4,
//               backgroundColor: "grey.300",
//               borderRadius: 2,
//               mx: "auto",
//               mb: 2,
//             }}
//           />

//           {/* Header */}
//           <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
//             Select form type
//           </Typography>

//           <Divider sx={{ mb: 2 }} />

//           {/* Options */}
//           <RadioGroup value={value} onChange={(e) => handleSelect(e.target.value)}>
//             <FormControlLabel
//               value="Complaint"
//               control={<Radio />}
//               label={
//                 <Box>
//                   <Typography fontWeight="bold">Complaint</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Report an issue with our service or facilities
//                   </Typography>
//                 </Box>
//               }
//             />
//             <Divider sx={{ my: 1 }} />
//             <FormControlLabel
//               value="Request"
//               control={<Radio />}
//               label={
//                 <Box>
//                   <Typography fontWeight="bold">Request</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Ask for additional service or assistance
//                   </Typography>
//                 </Box>
//               }
//             />
//           </RadioGroup>
//         </Box>
//       </SwipeableDrawer>
//     </>
//   );
// }
