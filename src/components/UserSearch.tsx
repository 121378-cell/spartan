
import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile } from '../types/user';
import { Link } from 'react-router-dom';
import styles from './UserSearch.module.css';

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<UserProfile[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === '') return;

    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('displayName', '>=', searchTerm), where('displayName', '<=', searchTerm + '\uf8ff'));

    const querySnapshot = await getDocs(q);
    const foundUsers = querySnapshot.docs.map(doc => doc.data() as UserProfile);
    setUsers(foundUsers);
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Find Spartans..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>
      <div className={styles.resultsContainer}>
        {users.map(user => (
          <Link to={`/profile/${user.uid}`} key={user.uid} className={styles.userResult}>
            <img src={user.photoURL || '/placeholder-user.png'} alt={user.displayName} />
            <p>{user.displayName}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;
