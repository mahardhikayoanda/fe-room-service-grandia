"use client";

import React from "react";
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormGroup,
  Typography,
  Box,
} from "@mui/material";
import { cn } from "@/utils";

interface ModifierOption {
  uuid: string;
  name: string;
}

interface ModifierSectionProps {
  modifierUuid: string;
  title: string;
  required?: boolean;
  canChooseMultiple?: boolean;
  options: ModifierOption[];
  selectedValues: string[];
  onChange: (optionUuids: string[]) => void;
}

export default function ModifierSection({
  modifierUuid,
  title,
  required = false,
  canChooseMultiple = false,
  options,
  selectedValues,
  onChange,
}: ModifierSectionProps) {
  const handleCheckboxChange = (optionUuid: string) => {
    if (canChooseMultiple) {
      // Multiple selection allowed
      if (selectedValues.includes(optionUuid)) {
        onChange(selectedValues.filter((id) => id !== optionUuid));
      } else {
        onChange([...selectedValues, optionUuid]);
      }
    } else {
      // Single selection only (like radio button behavior)
      if (selectedValues.includes(optionUuid)) {
        onChange([]); // Uncheck if already selected
      } else {
        onChange([optionUuid]); // Replace with new selection
      }
    }
  };

  return (
    <Box className="mt-1 pt-4 px-6 bg-white">
      <Typography variant="subtitle1" className="font-bold text-gray-800 mb-3">
        {title}
        <Typography
          component="span"
          sx={{
            ml: "4px",
          }}
        >
          {required && (
            <>
              <span className="text-gray-400 font-normal">|</span>
              <span className="text-green-500 mx-1 font-bold">Required</span>
            </>
          )}
          <span className="text-gray-400 font-normal">
            (Choose {canChooseMultiple ? "one or more" : "1"})
          </span>
        </Typography>
      </Typography>

      <FormControl component="fieldset" className="w-full">
        <FormGroup>
          {options.map((option) => (
            <FormControlLabel
              key={option.uuid}
              control={
                <Checkbox
                  checked={selectedValues.includes(option.uuid)}
                  onChange={() => handleCheckboxChange(option.uuid)}
                  icon={
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: "2px solid #D1D5DB",
                        backgroundColor: "white",
                      }}
                    />
                  }
                  checkedIcon={
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: "2px solid #4F3534",
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "#4F3534",
                        }}
                      />
                    </Box>
                  }
                  sx={{
                    padding: "0px",
                  }}
                />
              }
              label={
                <Typography className="text-gray-900 font-medium">
                  {option.name}
                </Typography>
              }
              labelPlacement="start"
              className="mx-0 py-3"
              sx={{
                width: "100%",
                margin: "0",
                paddingBottom: "0px",
                marginBottom: "0px",
                borderBottom: "1px solid #E5E7EB",
                display: "flex",
                justifyContent: "space-between",
                marginLeft: 0,
                "&:last-child": {
                  borderBottom: "none",
                  marginBottom: 0,
                  paddingBottom: 0,
                },
                "& .MuiFormControlLabel-label": {
                  flex: 1,
                },
              }}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
}
