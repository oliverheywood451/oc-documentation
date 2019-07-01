---
path: "/main-concepts/assignments"
date: 2019-06-24T22:09:49.849Z
title: "Assignments"
section: "Main Concepts"
---

Now that we have an understanding of the various ordercloud parties (companies and groups) we can begin to talk about assignments. When you save an assignment you are creating a relationship between a party and an object (ordercloud "thing" such as product, category, etc). For example you might assign a usergroup to a category, thereby granting a user in that group visibility to that category.

There are basic principles around how assignments work that are critical to understanding our data model and more importantly how the data model can be applied to solve the most complex ordering scenarios efficiently

- Assignments are used to define a relationship
- Assignments are inclusive
- Assignments can be made at different levels
- Assignments cascade down higher levels to the individual user
- Assignments are many to many

## Assignments are Inclusive

When a user is created they exist in a vacuum. The user will not have access to any objects until an assignment is made to them directly, or through a higher level party assignment.

## Assignments Can Be Made at Different Levels

Assignments can be made at the company level (buyer, seller, supplier) or any usergroup within one of those companies. 

## Assignments Cascade Down Higher Levels to the Individual User

When the API is looking for what a given user has access to, it is checking for assignments. If that user is a member of a party that has an assignment to that object, then that user also has access to that object. Regardless of where an assignment is saved, all of these objects are presented to the user seamlessly and in a very flat structure.

## Assignments are Many to Many

Resources can be assigned to many different parties. Those parties can be assigned to many other resources. For example, one user can be assigned to multiple address while one address can be assigned to multiple users.

## Conclusion

You should now have an understanding of how assignments work from the admin perspective, but generally as an individual user you don't really care about the how or why, you just want to know what you're assigned to. The `Me` resource which we'll talk about next has the distinct role of rolling up and flattening any assignments to the individual user.