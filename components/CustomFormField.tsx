"use client"

import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/PatientForm"
import Image from 'next/image';
import PhoneInput from "react-phone-number-input"
import 'react-phone-number-input/style.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import { Textarea } from "./ui/textarea"
import * as Checkbox from '@radix-ui/react-checkbox';

type E164Number = string;


interface CustomProps{
    control: Control <any>,
    fieldType: FormFieldType
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: any) => React.ReactNode;
}


const RenderField = ({field, props}: {field: any; props: CustomProps}) => {
    
    const { fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton} = props;

    switch (fieldType) {
        case FormFieldType.INPUT: 
        return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">
                {iconSrc && (
                    <Image 
                        src={iconSrc}
                        height={24}
                        width={24}
                        alt={iconAlt || 'icon'}
                        className='ml-2'
                    />
                )}
                <FormControl>
                    <Input 
                        placeholder={placeholder}
                        {...field}
                        className="shad-input border-0"
                    />
                </FormControl>
                
            </div>
        )
        // break;
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea 
                        placeholder={placeholder}
                        {...field}
                        className="shad-textArea"
                        disabled={props.disabled}
                    />
                </FormControl>
            )

        case FormFieldType.PHONE_INPUT:
            return(
                <PhoneInput 
                    defaultCountry="US"
                    placeholder={placeholder}
                    international
                    withCountryCallingCode
                    value={field.value as E164Number | undefined}
                    onChange={field.onChange}
                    className="input-phone "
                />
            )
        case FormFieldType.DATE_PICKER:
            return (
                <div className="flex rounded-md 
                border border-dark-500 bg-dark-400">
                    <Image 
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt="calender"
                        className="ml-2"
                    />
                    <FormControl>
                        <DatePicker 
                        selected={field.value} 
                        onChange={(date) => field.onChange
                        (date)}
                        dateFormat={dateFormat ?? 'MM/dd/yyyy'}
                        showTimeSelect={showTimeSelect ??
                        false}
                        timeInputLabel="Time:"
                        wrapperClassName="date-picker"
                        />
                    </FormControl>
                </div>
            )

        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select.Root onValueChange={field.
                    onChange} defaultValue={field.value}  >
                        <FormControl>
                            <Select.Trigger 
                            className="relative w-full flex items-center rounded-md border border-dark-500 bg-dark-400 p-2"
                            >
                            <Select.Value  placeholder=
                            {placeholder} />
                            <Select.Icon className="absolute right-2 pointer-events-none">
                            <ChevronDownIcon />
                        </Select.Icon>
                            </Select.Trigger>
                        </FormControl>
                        <Select.Portal>
                        <Select.Content 
                        className="w-full rounded-md border border-dark-500 bg-dark-400"
                        >
                            {props.children}
                        </Select.Content>
                        </Select.Portal>
                    </Select.Root>
                </FormControl>
            )
        case FormFieldType.SKELETON:
            return renderSkeleton ? renderSkeleton
            (field) : null
        
            case FormFieldType.CHECKBOX:
                return ( 
                <FormControl>
                     <div className="flex items-center gap-4">
                        <Checkbox.Root 
                           id={props.name}
                           checked={field.value}
                           onCheckedChange={field.onChange}
                           className="border border-gray-300 rounded p-2"
                        >
                        <Checkbox.Indicator className="text-violet11">
                        <CheckIcon />
                        </Checkbox.Indicator>
                        </ Checkbox.Root>
                    <label htmlFor={props.name}
                    className="checkbox-label"
                    >
                        {props.label}
                    </label>
                    </div>
                </FormControl>
                )
        default:
        break;
    }
}
const CustomFormField = ( props: CustomProps) => {
    const {control, fieldType, name, label} = props;
  
    return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem className="flex-1">
                {fieldType !== FormFieldType.CHECKBOX && label && (
                    <FormLabel>{label}</FormLabel>
                )}

{/* Source: The field object is provided by react-hook-form through the render
 function inside the FormField component. */}
    {/* Usage: It contains properties and methods related to the specific form field being rendered. This includes:
    field.value, field.onChange, field.onBlur */}
               <RenderField field={field} props={props} />

                <FormMessage className="shad-error" />
            </FormItem>
  )}
    />
  )
}

export default CustomFormField
