This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Demo
![Search Demo](https://github.com/carmenluo/search-github-repos/blob/master/client/public/images/search-github-repos-search.gif)
![Error message](https://github.com/carmenluo/search-github-repos/blob/master/client/public/images/error_message.png)
![Responsive](https://github.com/carmenluo/search-github-repos/blob/master/client/public/images/responsive.gif)
## Setup
Seperating code into client folder to maintain structures
In the project directory, you can run:

### `yarn install`
### `cd client`
### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Assumption/Notes for web app 'search-github-repos'
1. Only allows users to search for valid user name, if not, error messages going to show
2. Using pagination to process large amout of return repo items
3. Separate React app into `hooks`, `reducers`, `components` folder so that it will be easier to add more features in the future
4. SASS for css styling
5. When I developed this app I ran into some issues handling the pagination from github api because they only return the maximum 100 items per page. I used the recursive function to get all the items.
6. TODO: I realize I should use useMem/useCallback to make use of cashed results to save some time. us
And I also should add formal testing for it.
Fuzzy Search for username suggestions
7. I understand there may be some bugs and there would be always a better way to construct the app from the beginning. I appreciate all the feedback. Thanks.