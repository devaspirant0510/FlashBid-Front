import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH, faFaceSmile, faImage} from "@fortawesome/free-solid-svg-icons";

const WritePost = () => {
    return (
        <div className="flex justify-center px-4 py-2">
            <div className="flex items-center justify-between bg-white w-full max-w-[800px] rounded-lg shadow px-4 py-3">
                <div className="flex items-center gap-3 w-full">
                    <img
                        src="/images/profile.jpg"
                        className="rounded-full w-10 h-10 bg-[#F7F7F7]"
                    />
                    <input
                        type="text"
                        placeholder="새로운 글 작성하기"
                        className="w-full bg-transparent outline-none text-gray-600 placeholder:text-gray-400"
                    />
                </div>
                <div className="flex items-center gap-3 ml-4">
                    <button disabled style={{background:"#FFFFFF"}} className="bg-transparent text-gray-400">
                        <FontAwesomeIcon icon={faFaceSmile} />
                    </button>
                    <button disabled style={{background:"#FFFFFF"}} className="bg-transparent text-gray-400">
                        <FontAwesomeIcon icon={faImage} />
                    </button>
                    <button disabled style={{background:"#FFFFFF"}} className="bg-transparent text-gray-400">
                        <FontAwesomeIcon icon={faEllipsisH} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WritePost;
