export function formatedRelativeTime(date: Date) {
    const now = new Date();

    const diffInDay = Math.floor(
        (now.getTime() - new Date(date).getTime()) / (1000 * 60 *60 *24)
    );

    if(diffInDay ===0){
        return "Posted Today";
    }else if(diffInDay === 1){
        return "Posted 1 day ago";
    }else{
        return `Posted ${diffInDay} day ago`;
    }
}