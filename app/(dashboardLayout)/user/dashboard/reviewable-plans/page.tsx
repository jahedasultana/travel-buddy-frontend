"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchReviewablePlans } from "@/services/reviews/reviewManagement";

export default function ReviewList() {
    const [participantTrips, setParticipantTrips] = useState<any[]>([]);
    const [hostTrips, setHostTrips] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(null);

    useEffect(() => {
        fetchReviewablePlans().then((res) => {
            setParticipantTrips(res.participantTrips);
            setHostTrips(res.hostTrips);
        });
    }, []);

    console.log(hostTrips)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Participant → Host */}
            hi
            {participantTrips.map((p) => (
                <Card key={p.id}>
                    <CardHeader>
                        <CardTitle>{p.plan.destination} (Host: {p.plan.user.name})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Trip Dates: {new Date(p.plan.startDate).toDateString()} - {new Date(p.plan.endDate).toDateString()}</p>
                        <Button onClick={() => setSelected({ planId: p.planId, targetUserId: p.plan.userId, name: p.plan.user.name })}>
                            Review Host
                        </Button>
                    </CardContent>
                </Card>
            ))}

            {/* Host → Participants */}
            {hostTrips.length > 0 && hostTrips.map((p) =>
                p.participants.map((pt: any) => (
                    <>hello</>
                ))
            )}

            {/* {selected && (
                <ReviewModal
                    open={!!selected}
                    onClose={() => setSelected(null)}
                    planId={selected.planId}
                    targetUserId={selected.targetUserId}
                    targetUserName={selected.name}
                />
            )} */}
        </div>
    );
}
