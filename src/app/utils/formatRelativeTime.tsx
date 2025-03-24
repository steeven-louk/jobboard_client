export function formatedRelativeTime(date: Date) {
    const now = new Date();

    const diffInDay = Math.floor(
        (now.getTime() - new Date(date).getTime()) / (1000 * 60 *60 *24)
    );

    if(diffInDay ===0){
        return "Poster Aujourd'hui";
    }else if(diffInDay === 1){
        return "Poster il y a 1j";
    }else{
        return `Poster il y a ${diffInDay}j`;
    }
}