# Data
arr_input = []
arr_medians = []


# Function to calculate the median
def mediana(array):
    # Before calculating, we need to sort array
    array = heapSort(array)

    # Calculating the mediana
    if len(array) % 2 != 0:
        return array[int((len(array)-1) / 2)]
    else:
        return [array[int((len(array)-1) / 2)], array[int((len(array)-1) / 2) + 1]]


# Heapsort
def heapSort(li):
    def downHeap(li, k, n):
        new_elem = li[k]
        while k <= n/2:
            child = 2*k;
            if child < n and li[child] < li[child+1]:
                child += 1
            if new_elem >= li[child]:
                break
            li[k] = li[child]
            k = child
        li[k] = new_elem

    size = len(li)
    for i in range(round(size/2-1),-1,-1):
        downHeap(li, i, size-1)
    for i in range(size-1,0,-1):
        temp = li[i]
        li[i] = li[0]
        li[0] = temp
        downHeap(li, 0, i-1)
    return li


# Input
n = int(input('Input number of elements: '))
for i in range(n):
    el = int(input())
    arr_input.append(el)
    arr_medians.append(mediana(arr_input))

# Output
print('Input array:',arr_input)
print('Array of medians:',arr_medians)
