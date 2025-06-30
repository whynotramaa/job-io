import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { SideBarUserBtnClient } from "./_SideBarUserBtnClient";

async function SidebarUserSuspenseContent() {
    const { userId } = await auth();

    return (
        <SideBarUserBtnClient
            user={{ email: "rama@gmail.com", name: "Ramanath Thakur", imageUrl: "" }}
        />
    );
}
export function SidebarUserBtn() {
    return (
        <Suspense fallback={<div>Loading user data...</div>}>
            <SidebarUserSuspenseContent />
        </Suspense>
    );
}