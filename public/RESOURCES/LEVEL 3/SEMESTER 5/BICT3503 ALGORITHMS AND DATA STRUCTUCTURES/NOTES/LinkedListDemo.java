// Node Class
class Node<T> {
    T data;         // Stores the value
    Node<T> next;   // Points to the next node

    Node(T data) {
        this.data = data;
        this.next = null;
    }
}

// Linked List Class
class LinkedList<T> {
    Node<T> head;   // First node in the list

    // Add node at the beginning
    public void addFirst(T data) {
        Node<T> newNode = new Node<>(data);
        newNode.next = head;  // Link new node to old head
        head = newNode;       // New node becomes the head
    }

    // Add node at the end
    public void addLast(T data) {
        Node<T> newNode = new Node<>(data);

        if (head == null) { // empty list
            head = newNode;
            return;
        }

        Node<T> temp = head; 
        while (temp.next != null) { // move until last node
            temp = temp.next;
        }

        temp.next = newNode; // attach new node to last
    }

    // Print the list
    public void printList() {
        Node<T> current = head;
        while (current != null) {
            System.out.print(current.data + " → ");
            current = current.next;
        }
        System.out.println("null");
    }
}

// Testing Everything Together
public class LinkedListDemo {
    public static void main(String[] args) {
        LinkedList<Integer> list = new LinkedList<>();

        list.addFirst(10);  // List: 10
        list.addFirst(5);   // List: 5 → 10
        list.addLast(20);   // List: 5 → 10 → 20
        list.addLast(25);   // List: 5 → 10 → 20 → 25

        list.printList();   // Output: 5 → 10 → 20 → 25 → null
    }
}
