document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a");

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function (e) {
            e.preventDefault();
            const href = this.getAttribute("href");
            document.querySelector("body").classList.add("transition");
            setTimeout(function () {
                window.location.href = href;
            }, 500);
        });
    }
});



/*
// Function to handle the sign-in form submission
function handleSignInFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const formData = new FormData(form); // Get the form data

    // Create an object from the form data
    const signInData = Object.fromEntries(formData.entries());

    // Send the POST request to the API endpoint
    fetch('http://localhost:3000/Users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signInData)
    })
        .then(response => {
            if (response.ok) {
                console.log('Sign-in successful');
                // Perform any desired actions after successful sign-in
            } else {
                console.error('Sign-in failed');
                // Perform any desired actions after sign-in failure
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Perform any desired error handling
        });
}

// Add an event listener to the sign-in form submission event
const signInForm = document.getElementById('signin-form');
signInForm.addEventListener('submit', handleSignInFormSubmit);
*/


// ...

// Create new user (sign in)
app.post('/signup', (req, res) => {
    const signInData = req.body;

    MongoClient.connect('http://127.0.0.1', { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.error('Error connecting to MongoDB:', err);
            res.status(500).send('Error connecting to MongoDB');
            return;
        }

        const db = client.db(Project0);
        const collection = db.collection(Users);

        collection.insertOne(signInData, (err) => {
            if (err) {
                console.error('Error signing in:', err);
                res.status(500).send('Error signing in');
                return;
            }

            res.status(201).send('Sign-in successful');
        });

        client.close();
    });
});

  // ...

