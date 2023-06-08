##5-16-2023
My Docker stopped working, and I spent most of the day troubleshooting Docker.

##5-17-2023
Worked on:
(1) Navigated on creating back-end auth.
(2) Navigated on creating tables for Item and Account.
(3) Navigated on finishing up Docker yml file.

Reflection:
Creating table manually and accessing it through terminal was fun. The docker yml template provided was pretty comprehensive so we didn't have much trouble there.

Ah-ha:
You can create 64 character secret code on terminal using openssl command! You can also go to a website to decode jwt, which is pretty cool.


##5-18-2023
Worked on:
(1) Navigated on creating queries & routers for items and accounts
(2) Navigated on continuing to work on back-end auth
(3) Navigated on creating CRUD for items

Reflection:
FastAPI is definitely different from Django. Back-end auth is new, since Django had taken it for us before.
Creating migration tables is also a little funky, since Django took care of that too. Definitely a learning curve
to figure out the migration flow. For instance, it took us some time to realize that we had to delete all the pycache
whenever we make changes to our migration table.

Accessing database (psql) through terminal is a bit daunting. Since we don't have our backend set up to display CRUD functionalities, we are familiaring ourselves with the sql commands on the terminal, as it is our only way to test out our codes.

Ah-ha:
you NEED to put the semi-colon for the sql command. you need to delete cache and recreate database whenever changing attributes on the table.


##5-22-2023
Worked on:
(1) Navigated on creating Item Form to create a new item on the front-end.
(2) Navigated on finishing up the CRUD for the item on the back-end.
(3) Navigated on creating a log-in and sign-up page on the front-end.
(4) Navigated on finishing up queries/items.py ItemRepositories
(5) Navigated on finishing up routers/items.py for endpoints.

Reflection:
There are lots of moving parts. I am beginning to understand how FastAPI works, how to define
repositories in the queries and how to use the repository in the routers. CRUD on the backend is pretty
straightforward as it is similar to what we did in Mod 2 project.

Ah-ha:
We should keep the method names between queries and routers (create, delete, etc) consistent in order to
minimize confusion.


##5-23-2023
Worked on:
(1) Navigated on creating ItemDetail and ItemList front-end, that fetches Items from the backend
and uses React to display them. Item list will show all item instances while item detail shows all
column info for the selected item

Reflection:
Things are pretty straightforward on the frontend, as it is the same as what we did with Django,
especially when it comes to list and detail page.

Ah-ha:
There are few ways to redirect - anchor tag, NavLink, etc - we should probably stick with NavLink when possible,
more react-ful.


##5-24-2023
Worked on:
(1) Trouble-shooting Docker
(2) Navigated backend auth.
(3) Learned about JWT and cookies for the backend auth

Reflection:
My docker is keep throwing a fit, where it would get stuck importing necessary dependencies when I
docker compose build. I tried everything from redownloading Docker and restarting the computer.

Ah-ha:
I have to reset the router (my internet modem) every time Docker is giving me trouble.

##5-25-2023
Worked on:
(1) Naviagated fixing up back-end endpoints for all CRUD funtionalities for items and account info

Reflection:
Setting up the endpoints using FastAPI was a learning curve, but once I got used to it, it became
more like a repetition.

Ah-ha:
Using correct response model is very important, especially when testing things out on localhost:8000/docs
and also tying it up with the front-end.


##5-26-2023
Worked on:
(1) Implemented front-end auth
(2) Spent time learning how to grab information out from the JWT token


Reflection:
Getting the currnet user's account id was more difficult than expected. But at the end
I was able to figure out how to use localstorage to grab jwt token, from which
we can extract account information

Ah-ha:
Learned how to use localstorage.getItem('authToken')


##5-27-2023
Worked on:
(1) Navigated itemType and dietary_restriction changes on itemForm.
(2) Refactoring backend.

Reflection:
Didn't have too much time to work on our group project after the lecture.

Ah-ha:
We could use black to clean up all our py codes.



##5-30-2023
Worked on:
(1) Added sort feature on ItemList by time_of_post.
(2) Added sort feature on ItemList by expiry.
(3) Added filter feature on ItemList by dietary_restriction
(4) Added filter feature on ItemList by item_type.

Reflection:
Sorting and filtering features were not too difficult to implement than I expected.
I need to wait on sort by distance feature, but it shouldn't be too different than my current sort features.

Ah-ha:
We can sort on front-end, as we did on mod 2 project.


##5-31-2023
Worked on:
(1) Added Owner Item Page, which is basically like an item list page, where we grab all items
from the backend. However, we filter it by account_id, so that only those whose account_id matches with
the currently logged in user's account_id show up.

Reflection:
Once the backend is set up, most work can be done on the front-end. I thought we would have to manipulate
the backend to implement the sort filter by account_id, but it was able to be implemented through the front-end only.
Also, the use of components is very convenient on React. OwnerItem is essentially the same as ItemList page.

Ah-ha:
Sorting is very easy when done on the front-end. You have to fetch data from the backend once, and use useEffect to show or hide
information by your desire.


##6-1-2023
Worked on:
(1) Studied Candice's MongoDB Library project to learn about Websocket

Reflection:
Her websocket features works by giving a real-time update of the available book count.
Whenever someone takes out a book, or returns a book, the available book count reflects such changes.
Ours will be different. We need a real-time messaging feature. I wonder if we have time to implement
a messaging service for each item by users.

Ah-ha:
Websocket is different from rabbitmq, which is more for communication between backends. Also it is different
as it is not a constantly open communication. Unlike websocket, rabbitmq closes channel once messages are sent out.


##6-2-2023
Worked on:
(1) Navigated Nick adding Location when creating a user
    (2) Created a new column on user table
    (3) Remove location in item form
    (4) Automatically assign the user's location to the item
    (5) Add location on User Profile page

Reflection:
Updating a table is always a hassle. We have to go back and change
all the relations between data, as is common for relational database.
Hopefully I get to learn more about Mongo in my future projects.

Ah-ha:
I remembered to remove all pycache and database whenever making changes to the
migration table.


##6-5-2023
Worked on:
(1) Began to implement websocket
(2) Got the general chat feature to work, as shown on the exploration
(3) Began to look into deployment and created CI yaml file

Reflection:
Deployment was not as simple as it was for Mod 2 project. Need to spend time
learning about Cirrus and gitlab flow

Ah-ha:
Websocket works by setting up a continuous flow between back-end and front-end


##6-6-2023
Worked on:
(1) CI/CD, going through the cookbook with the group
(2) Fixed a bug on updating user profile
(3) Fixed a bug on updating user item
(4) Started to work on Unit Test

Reflection:
It is good to have another set of eyes. I think I am better
at navigating than driving. As soon as I saw the code on my partner's computer
I was able to spot what was wrong with our user item update form.

Ah-ha:
Realized that we changed the record_to_out on ItemRepository while
implementing location feature. Therefore, it was not updating properly
since we had to add location onto the query section.


##6-7-2023
Worked on:
(1) CI/CD, particularly learning about Cirrus
(2) Figuring out how to implement websocket for each item
(3) Clean up the nav bar (removing chat, user item detail)
(4) Finished up Unit Test

Reflection:
It is difficult to learn a new concept while trying to implement it.
I was able to get a general chat going, but I am not sure how to go about
setting one up for each item

Ah-ha:
I realized that I have two websocket backends by mistake


##6-8-2023
Worked on:

Reflection:

Ah-ha:

##6-9-2023
Worked on:

Reflection:

Ah-ha:
