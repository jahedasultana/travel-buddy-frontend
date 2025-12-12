'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner"
import { registerUser } from "@/services/auth/registerUser"
import InputFieldError from "../InputFieldError"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { getNames } from "country-list";
import ProfileUploader from "../ProfileUploader"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [state, formAction, isPending] = useActionState(registerUser, null)
  const [profileImage, setProfileImage] = useState<File | null>(null)

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message)
    }
  }, [state])


  const interests = [
    "Hiking",
    "Camping",
    "Trekking",
    "Mountain Climbing",
    "Skiing",
    "Surfing",
    "Museum Visits",
    "Historical Sites",
    "Art Galleries",
    "Cultural Festivals",
    "Food Tours",
    "Street Food Tasting",
    "Cooking Classes",
    "Bird Watching",
    "Safari Tours",
    "Beach Relaxation",
    "City Tours",
    "Photography",
    "Videography",
    "Yoga Retreats"
  ]

  return (
    <form action={formAction} className={cn("flex flex-col gap-6", className)} {...props}>

      {/* hidden input file for profile image  */}
      <input
        type="file"
        name="profileImage"
        ref={(el) => {
          if (el && profileImage) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(profileImage);
            el.files = dataTransfer.files;
          }
        }}
        hidden
      />

      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
        </div>

        <div className="flex items-center gap-5 flex-col md:flex-row">
          {/* name field  */}
          <Field>
            <FieldLabel htmlFor="name">
              Full Name
              <span className="text-red-500">*</span>
            </FieldLabel>
            <Input name="name" id="name" type="text" placeholder="Ex: Nabil Siddik" />

            <InputFieldError field="name" state={state} />

          </Field>

          {/* email field  */}
          <Field>
            <FieldLabel htmlFor="email">Email <span className="text-red-500">*</span></FieldLabel>
            <Input name="email" id="email" type="email" placeholder="example@gmail.com" />

            <InputFieldError field="email" state={state} />

          </Field>
        </div>

        {/* bio field  */}
        <Field>
          <FieldLabel htmlFor="email">Bio (optional)</FieldLabel>
          <Textarea name="bio" placeholder="Write a short bio." />

          <InputFieldError field="bio" state={state} />

        </Field>

        <div className="flex flex-col md:flex-row gap-5">
          {/* gender field */}
          <Field>
            <FieldLabel htmlFor="email">Gender <span className="text-red-500">*</span></FieldLabel>
            <Select name="gender">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
                <SelectItem value="OTHERS">Others</SelectItem>
              </SelectContent>
            </Select>
            <InputFieldError field="gender" state={state} />
          </Field>

          {/* current location field  */}
          <Field>
            <FieldLabel htmlFor="currentLocation">
              Current Location (optional)
            </FieldLabel>
            <Input name="currentLocation" id="currentLocation" type="text" placeholder="Your Current Location" />

            <InputFieldError field="name" state={state} />

          </Field>
        </div>


        {/* <Field>
          <CountrySelectInput countries={countries} />
        </Field>

        <Field>
          <InterestSelectInput interests={interests} />
        </Field> */}

        <div className="flex items-center flex-col md:flex-row gap-5">
          {/* password field  */}
          <Field>
            <FieldLabel htmlFor="password">Password<span className="text-red-500">*</span></FieldLabel>
            <Input name="password" id="password" type="password" placeholder="Type Secure password" />

            <InputFieldError field="password" state={state} />
          </Field>

          {/* confirm password  */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password<span className="text-red-500">*</span></FieldLabel>
            <Input name="confirmPassword" id="confirmPassword" type="password" placeholder="Confirm Password" />

            <InputFieldError field="confirmPassword" state={state} />
          </Field>
        </div>


        <div>
          <ProfileUploader setProfileImage={setProfileImage} />
        </div>


        <Field>
          <Button type="submit" disabled={isPending}>{isPending ? 'Creating...' : 'Create Account'}</Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href={'/login'}>Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}