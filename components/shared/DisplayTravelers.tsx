import { IUser } from "@/types/user.interface"
import TravelerCard from "./TravelerCard"

const DisplayTravelers = ({ travelers }: { travelers: IUser[] | [] }) => {

  console.log(travelers)

  return (
    <div className="container mx-auto px-5 my-20">
      <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {travelers?.length > 0 && travelers?.map((traveler, index) => {
          return <TravelerCard key={index} traveler={traveler} />
        })}
      </div>
    </div>
  )
}

export default DisplayTravelers
