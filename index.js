import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs/promises';

// Function to scrape book details
const scrapeBooks = async () => {
    try {
        // Fetch HTML content from the URL
        const response = await axios.get('https://books.toscrape.com/');
        const html = response.data;

        // Load HTML content into Cheerio
        const $ = cheerio.load(html);

        // Array to store book details
        const books = [];

        // Iterate over each book item
        $('.product_pod').each((index, element) => {
            const title = $(element).find('h3 a').attr('title');
            const price = $(element).find('.price_color').text();
            const rating = $(element).find('p').attr('class').split(' ')[1]; // Extract class for rating
            books.push({ title, price, rating });
        });

        // Convert data to JSON string
        const dataString = JSON.stringify(books, null, 2);

        // Write data to a text file
        await fs.writeFile('Books.txt', dataString);
        console.log('Data has been scraped and saved to Books.txt');
    } catch (error) {
        console.error('Error:', error);
    }
};

// Call the function to start scraping
scrapeBooks();
