import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"

export function UserData({ email, username }) {
    return (
        <section className="grid gap-6">
            <h2 className="text-2xl font-bold">Your Data</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Avatar className="w-24 h-24 border">
                <AvatarImage alt="User Name" src="/placeholder-user.jpg" />
                <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                <h3 className="font-semibold text-lg md:text-xl">{username}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
                </div>
            </div>
        </section>
    )
}