export function useSearchService() {
    return fakeService;
}

const fakeHints = [
    'best coffee shops near me',
    'how to learn Python programming',
    'top tourist attractions in Paris',
    'healthy dinner recipes',
    'latest smartphone reviews',
    'how to start a blog',
    'tips for improving public speaking',
    'best books of 2024', 'how to meditate for beginners',
    'DIY home improvement projects',
    'fun activities for kids at home',
    'best workout routines for weight loss',
    'how to save money on groceries',
    'upcoming movies in theaters',
    'top 10 travel destinations in Asia',
    'how to improve your credit score',
    'best online courses for career development',
    'easy gardening tips for beginners',
    'how to create a budget plan',
    'best practices for remote work',
    'ways to boost your immune system',
    'how to make homemade pizza',
    'tips for effective time management'
];

const fakeService = {
    getHints(queryString) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve(fakeHints);
            }, 500)
        });
    }
}