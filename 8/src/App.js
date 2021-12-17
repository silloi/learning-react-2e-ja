import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import GitHubUser from "./GitHubUser";
import UserRepositories from "./UserRepositories";
import RepositoryReadme from "./RepositoryReadme";
import { GraphQLClient } from 'graphql-request';

function UserDetails({ login, name, avatar_url, location }) {
  console.log('datab', login);

  return (
    <div className="githubUser">
      <img src={avatar_url} alt={login} style={{ width: 200 }} />
      <div>
        <h1>{login}</h1>
        {name && <p>{name}</p>}
        {location && <p>{location}</p>}
      </div>
    </div>
  );
}

function List({ data = [], renderEmpty }) {
  if (!data.length) return renderEmpty;
  return <p>{data.length} items</p>;
}

const query = `
  query findRepos($login:String!) {
    user(login:$login) {
      login
      name
      location
      avatar_url: avatarUrl
      repositories(first:100) {
        totalCount
        nodes {
          name
        }
      }
    }
  }
`;

const client = new GraphQLClient(
  "https://api.github.com/graphql",
  {
    headers: {
      Authorization: 'Bearer '
    }
  }
);

export default function App() {
  const [login, setLogin] = useState("silloi");
  const [repo, setRepo] = useState("learning-react");
  const [userData, setUserData] = useState();
  useEffect(() => {
    client.request(query, { login })
      .then(({ user }) => user)
      .then(setUserData)
      .catch(console.error);
  }, [login]);

  if (!userData) return <p>loading...</p>

  console.log('datan', userData);

  const handleSearch = login => {
    if (login) return setLogin(login);
    setLogin("");
    setRepo("");
  };

  // if (!login)
  //   return (
  //     <SearchForm value={login} onSearch={handleSearch} />
  //   )

  return (
    <>
      <SearchForm value={login} onSearch={handleSearch} />
      <UserDetails {...userData} />
      <p>{userData.repositories.totalCount} - repos</p>
      <List
        data={userData.repositories.nodes}
        renderItem={repo => <span>{repo.name}</span>}
      />
      {/* <GitHubUser login={login} />
      <UserRepositories
        login={login}
        selectedRepo={repo}
        onSelect={setRepo}
      />
      <RepositoryReadme login={login} repo={repo} /> */}
    </>
  );
}
