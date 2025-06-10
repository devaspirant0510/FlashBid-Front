import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import MyFeed from "@/features/profile/ui/MyFeed.tsx";

const MyFeedList = () => {
    return (
        <section className="bg-white rounded-xl shadow border text-center px-8 py-5">
            <div className="flex justify-between items-center mb-5">
                <span className="font-semibold "
                      style={{fontSize: 24, color: '#ED6C37', fontWeight: 'bold'}}>
                    MY 게시물
                </span>
                <div>
                    <span className="text-sm text-muted-foreground mr-1"
                          style={{color: '#ED6C37'}}>
                        최신순
                    </span>
                    <span className="text-sm text-muted-foreground"
                          style={{color: '#ED6C37'}}>
                        <FontAwesomeIcon icon={faChevronDown}/>
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {[10,11,12,13,5,9,7,8].map(id => (
                    <MyFeed key={id} id={id}/>
                ))}
            </div>

        </section>
    )
}

export default MyFeedList;