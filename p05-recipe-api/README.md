# Web Development Project 5 - *DishDash*

Submitted by: **Jimmy Salvador-Contreras**

This web app: **uses the  Spoonacular API to fetch recipe data to display a list of dishes the user can search and sort by recipe name and caloric range.**

Time spent: **10** hours spent in total

## Required Features

The following **required** functionality is completed:

- [X] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [X] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes at least three summary statistics about the data, such as:
    - *The total recipes displayed, the average cost of all the recipes shown, and the average calories of all the recipes*
- [X] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [X] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar 
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [ ] Multiple filters can be applied simultaneously
- [X] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
- [ ] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!
    - Included recipe images
    - Used a navy blue outline for the background with a lighter blue shade

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='p05-recipe-api-walkthrough.gif' title='P05 - Recipe API Walkthrough' width='' alt='Recipe Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  [ScreenToGif](https://www.screentogif.com/) for Windows

## Notes

Describe any challenges encountered while building the app.
I struggled to get the API key for the Recipes. The free plan limits how much data can be fecthed and thus, only 50 pieces can be pulled so I have the loading recipes often.  

## License

    Copyright [2025] [Jimmy Salvador-Contreras]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.