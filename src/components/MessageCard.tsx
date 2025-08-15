
import dayjs from 'dayjs';
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { Trash2 } from 'lucide-react'
import { Message } from "@/model/User.model"
import {toast} from "sonner"
import axios from "axios"
import { ApiResponse } from "@/types/ApiResponse"

type MessageCardProps = {
    message: Message;
    onMessageDelete:(messageId:string)=>void
}

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {


    const handleDeleteConfirm = async () => {
        const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`);

        toast("Message is deleted");
        onMessageDelete(message._id as string)
    }

  return (
    <Card className="card-bordered bg-gray-800 border-gray-600">
        <CardHeader>
              <div className="flex justify-between items-center">
                  
                  <CardTitle className='text-gray-100'>{message.content}</CardTitle>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-500/10">
                                    <Trash2 className="w-full h-10" />
                                </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className='bg-gray-800 border-gray-700'>
                            <AlertDialogHeader>
                            <AlertDialogTitle className='text-gray-100'>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the Message and remove your data from our servers.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                  
              </div>
              <div className="text-sm text-gray-400">
                {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
              </div>
        
        </CardHeader>
    </Card>
  )
}

export default MessageCard