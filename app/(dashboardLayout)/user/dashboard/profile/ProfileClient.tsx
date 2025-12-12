"use client";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import InputFieldError from "@/components/InputFieldError";
import Image from "next/image";
import { BadgeCheck, Check, Edit } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { updateUserProfile } from "@/services/user/userProfileManagement";
import ProfileUploader from "@/components/ProfileUploader";
import { usePathname } from "next/navigation";
import LeaveReview from "@/components/shared/review/LeaveReview";

export default function ProfileClient({ user }: { user: any }) {
    const [edit, setEdit] = useState(false);
    const [profileImage, setProfileImage] = useState<File | null>(null)
    const [profileState, profileAction, isProfileUpdating] =
        useActionState(updateUserProfile, null);

    const path = usePathname()

    useEffect(() => {
        if (profileState?.message && !profileState.success) {
            toast.error(profileState.message);
        } else if (profileState?.success) {
            toast.success("Profile updated successfully!");
            setEdit(false);
        }
    }, [profileState]);

    return (
        <div className="space-y-10">

            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">
                    {path.startsWith('/traveler-profile') ? 'Traveler Profile' : 'My Profile'}
                </h2>

                {!path.startsWith('/traveler-profile') &&
                    <Button variant="ghost" onClick={() => setEdit(!edit)}>
                        {edit ? "Cancel" : "Edit Profile"}
                    </Button>
                }

            </div>

            <div className="flex flex-col md:flex-row gap-10 border rounded-xl p-6 bg-white shadow-sm">

                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-40 h-40 rounded-full overflow-hidden border shadow">
                        <Image
                            src={user.profileImage || "/placeholder-user.jpg"}
                            alt="Profile"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {user.verifiedBadge && (
                        <span className="flex items-center gap-1 text-blue-600 font-medium">
                            <BadgeCheck className="w-5 h-5" />
                            Verified User
                        </span>
                    )}
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-gray-500">Name</p>
                        <p className="font-semibold">{user.name}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Email</p>
                        <p className="font-semibold">{user.email}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Gender</p>
                        <p className="font-semibold capitalize">{user.gender || 'N/A'}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Current Location</p>
                        <p className="font-semibold">{user.currentLocation || "N/A"}</p>
                    </div>

                    <div className="md:col-span-2">
                        <p className="text-gray-500">Bio</p>
                        <p className="font-semibold">{user.bio || "No bio added"}</p>
                    </div>
                </div>
            </div>

            {user?.role === 'USER' &&
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-xl border shadow-sm bg-white">
                        <p className="text-gray-500">Interests</p>
                        <p className="font-semibold">{user.interests?.length || 0} items</p>
                        <ul>
                            {user.interests?.length > 0 && user?.interests?.map((item: any, index: number) => {
                                return <li key={index} className="flex items-center gap-2"><Check width={15} /> {item}</li>
                            })}
                        </ul>
                    </div>

                    <div className="p-5 rounded-xl border shadow-sm bg-white">
                        <p className="text-gray-500">Visited Countries</p>
                        <p className="font-semibold">{user.visitedCountries?.length || 0} countries</p>

                        <ul>
                            {user.visitedCountries?.length > 0 && user?.visitedCountries?.map((item: any, index: number) => {
                                return <li key={index} className="flex items-center gap-2"><Check width={15} /> {item}</li>
                            })}
                        </ul>
                    </div>

                    <div className="p-5 rounded-xl border shadow-sm bg-white">
                        <p className="text-gray-500">Created Travel Plans</p>
                        <p className="font-semibold">{user.createdTravelPlans?.length || 0} plans</p>
                    </div>
                </div>
            }

            {/* edit profile form */}
            {edit && !path.startsWith('/traveler-profile') && (
                <div className="border rounded-xl p-6 shadow-sm bg-white">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">Edit Profile <Edit /> </h3>

                    <form noValidate action={profileAction} className="space-y-6">
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

                        <div>
                            <ProfileUploader setProfileImage={setProfileImage} />
                        </div>

                        <FieldGroup>
                            <Field>
                                <FieldLabel>Name</FieldLabel>
                                <Input name="name" defaultValue={user.name} />
                                <InputFieldError field="name" state={profileState} />
                            </Field>

                            <Field>
                                <FieldLabel>Bio</FieldLabel>
                                <Textarea name="bio" defaultValue={user.bio} />
                            </Field>

                            <Field>
                                <FieldLabel>Current Location</FieldLabel>
                                <Input name="currentLocation" defaultValue={user.currentLocation} />
                            </Field>


                            {user?.role === 'USER' &&
                                <>
                                    <Field>
                                        <FieldLabel>Interests (comma separated)</FieldLabel>
                                        <Input
                                            name="interests"
                                            defaultValue={user.interests?.join(", ")}
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel>Visited Countries (comma separated)</FieldLabel>
                                        <Input
                                            name="visitedCountries"
                                            defaultValue={user.visitedCountries?.join(", ")}
                                        />
                                    </Field>
                                </>
                            }

                            <Button type="submit" disabled={isProfileUpdating}>
                                {isProfileUpdating ? "Saving..." : "Save Changes"}
                            </Button>
                        </FieldGroup>
                    </form>
                </div>
            )}


            {/* {path.startsWith('/traveler-profile') && 
                <LeaveReview/>
            } */}
        </div>
    );
}
