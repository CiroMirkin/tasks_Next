"use client"

import { createTaskSchema } from "@/app/api/schemas/taskSchema"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { PlusIcon } from "lucide-react"
import { SubmitEvent, useState } from "react"
import * as tasksApi from '@/app/dashboard/api/tasks'
import { useRouter } from "next/navigation"
import { ValidationError } from "yup"

export function CreateTask() {
    const router = useRouter()
    const [ text, setText ]= useState('')

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const { description } = await createTaskSchema.validate({ description: text })
            await tasksApi.createTask(description)
            setText('')
            router.refresh()
        } catch (e) {
            const error = e as ValidationError
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="pb-4">
            <FieldSet className="w-full max-w-xs">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="username">Task Description</FieldLabel>
                        <Input 
                            id="username" 
                            type="text" 
                            placeholder="Make a cup of cafe"
                            required
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <FieldDescription>
                            ---
                        </FieldDescription>
                    </Field>
                </FieldGroup>
                <Field orientation="horizontal">
                    <Button type="submit" title="Create task"><PlusIcon /> Create Task</Button>
                </Field>
            </FieldSet>
        </form>
    )
}