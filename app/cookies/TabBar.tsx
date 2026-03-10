"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { setCookie } from "cookies-next"
import { useState } from "react"

interface Props {
    currentTab?: number
    tabOptions?: number[]
}

export default function TabBar({ tabOptions = [], currentTab }: Props) {
    const [ selected, setSelected ] = useState(currentTab || 0)


    const handleSelectTab = (value: number) => {
        setSelected(value)
        setCookie('selectedTab', value.toString())
    }

    return (
        <Tabs defaultValue={selected} onValueChange={handleSelectTab}>
            <TabsList variant="line">
                { tabOptions.map(tab => (
                    <TabsTrigger 
                        key={tab} 
                        value={tab}
                        className={cn(
                            tab === selected && "bg-green-200!"
                        )}
                    >{tab}</TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}