"use client"
import React from 'react'
import Notes from './notes'
import { ScrollArea } from '../../ui/scroll-area'
import { useTabs } from '@/config/jotai/atoms'
import Trash from './trasheds'
import Remembers from './remembers'

const Content = () => {
  const [tab] = useTabs()
  return (
    <ScrollArea className="h-[100vh] w-full px-4 ">
      <div className="w-full mt-[80px]">
        {tab.tag === "notes" && <Notes />}
        {tab.tag === "trash" && <Trash />}
        {tab.tag === "remembers" && <Remembers />}
      </div>
    </ScrollArea>
  )
}

export default Content