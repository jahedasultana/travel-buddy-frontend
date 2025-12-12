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
import { useActionState, useEffect } from "react"
import { Input } from '@/components/ui/input';
import { FcGoogle } from 'react-icons/fc';
import Link from "next/link"
import { userLogin } from "@/services/auth/userLogin"
import InputFieldError from "../InputFieldError"
import { IInputErrorState } from "@/utils/getInputFieldError"
import { toast } from "sonner"

export function LoginForm({
  className,
  redirect,
  ...props
}: React.ComponentProps<"form"> & { redirect?: string }) {

  const [state, formAction, isPending] = useActionState(userLogin, null)

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message)
    }
  }, [state])


  return (
    <form noValidate action={formAction} className={cn("flex flex-col gap-6", className)} {...props}>

      {redirect && <input type='hidden' name='redirect' value={redirect} />}

      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input name="email" id="email" type="text" placeholder="m@example.com" />

          <InputFieldError field="email" state={state} />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input name="password" id="password" type="password" />

          <InputFieldError field="password" state={state as IInputErrorState} />
        </Field>
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Proccessing" : 'Login'}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Don't have an account? <Link href={'/signup'}>Sign up</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
