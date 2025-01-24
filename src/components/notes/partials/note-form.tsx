import { useSession } from 'next-auth/react'
import React from 'react'
import { useCreateNote } from '../hooks/create-note'
import { toast } from '@/hooks/use-toast'
import Loader from '../../custom/loader'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'

const Noteform = () => {
  const session = useSession()
  const {
    form,
    handleSubmit,
    loading,
    message
  } = useCreateNote(+session.data?.user.id!)


  const handleMessagePopOut = ({ message, type }: { message: string, type: "none" | "error" | "sucess" | undefined }) => {
    if (type === "error") {
      return toast({
        title: "Oops!",
        description: message,
        variant: "destructive",
        duration: 80000
      });
    }

    if (type === "sucess") return toast({
      title: "Bem vindo de volta",
      description: message,
      variant: "default",
    });
  };

  React.useEffect(() => {
    if (message) {
      handleMessagePopOut({ message: message.message, type: message.type });
    }
  }, [message]);
  const [isOpen, setOpen] = React.useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setOpen} >
      <div className="">
        <button onClick={()=>setOpen(true)} className="h-12 w-12 justify-center flex items-center bg-gray-100 rounded-full">
          <Plus />
        </button>
      </div>
      <DialogContent className='max-w-[700px] w-full p-0 shadow-none'>
        <div className=' w-full flex items-center justify-center'>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full py-1 px-4'>
            <div className="h-[50px] w-full">
              <input type="text" {...form.register("title")} disabled={session.status == "loading" || loading} className='w-full h-full text-slate-600 border-none outline-none' placeholder='Tire uma nota' />
            </div>
            <div className="">
              <textarea {...form.register("content")} disabled={session.status == "loading" || loading} placeholder='Tire uma nota' className='w-full h-full text-slate-600 border-none outline-none resize-none' id=""></textarea>
            </div>
            <div className="flex justify-end pb-1">
              <button type='submit' disabled={session.status == "loading" || loading} className='px-2 py-2 text-sm font-black rounded-md bg-green-100 text-green-700'>
                {!loading ? "Gravar" :
                  <Loader />}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>

  )
}

export default Noteform