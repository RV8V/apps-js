# Import randint function from random library
from random import randint

# function to check for the given sum in the array
def printPairs(arr, arr_size, sum):
    # Variable that response for collisions
    collisions = 0
	# Create an empty hash set
    s = set()

    # Algoritm itself
    for el in arr:
        temp = sum-el
        if (temp in s):
            # Success
            print( f'Pair with given sum {sum} is ({el}, {temp})')
        else:
            # Collision
            collisions += 1
        s.add(el)

    print('Collisions:',collisions)


# driver program to check the above function
A = [randint(1, 100) for _ in range(100)]
n = randint(1, 100)
printPairs(A, len(A), n)
