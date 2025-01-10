import reviews from './db/reviews.json'

export function useReviewService(){
    return fakeService
}

const fakeService={
    getReviewsByAuthor(author){
        return reviews.filter((review)=>review.authorUserId==author)
    }
}