import dayjs from 'dayjs';

class Review {
    constructor(id, userName, date, content) {
        this.id = id;
        this.userName = userName;
        this.date = date;
        this.content = content
    }

    get formattedDate() {
        return dayjs(this.date).format('MMM D, YYYY h:mm A').toString();
    }
};

export default Review;