import React,{useState} from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../lib/context/user';
import { useIdeas } from '../lib/context/ideas';

const AddIdea = () => {
    const user = useUser();
    const ideas = useIdeas();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [websiteLink, setWebsiteLink] = useState('');
    const [status, setStatus] = useState('');

    const STATUS = {
        COMPLETED: 'complated',
        PENDING: 'pending',
        INPROGRESS: 'inprogress',
        OPEN: 'open'
    }

    return (
        <div className='add-idea-container'>
            {user.current ? (
                <section className='submit-idea-form-container'>
                    <h2>Submit Idea</h2>
                    <form action="">
                        <div className='form-group'>
                            <label htmlFor="idea_title">Title</label>
                            <input type='text' id='idea_title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="description">Description</label>
                            <textarea placeholder='Description' id='description' value={description} onChange={(e) => setDescription(e.target.value)}>
                            </textarea>
                        </div>

                        <div className='form-group'>
                            <label htmlFor="idea_github_link">Github</label>
                            <input type='text' id='idea_github_link' value={githubLink} onChange={(e) => setGithubLink(e.target.value)} placeholder='https://github.com/example/' />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="idea_website_link">Website</label>
                            <input type='text' id='idea_website_link' value={websiteLink} onChange={(e) => setWebsiteLink(e.target.value)} placeholder='www.example.com' />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="idea_status">Status</label>
                            <select id='idea_status' onChange={(e)=> setStatus(e.target.value)}>
                                {Object.keys(STATUS).map((items, keys)=>(
                                    <option key={keys} value={items}>{items}</option>
                                ))}
                            </select>
                        </div>

                        <div className='button-container'>
                            <button type='button' className='custom-btn custom-btn-primary' onClick={() => ideas.add({ userId: user.current.$id, title, description, githubLink, websiteLink, status })}>Submit</button>
                        </div>

                    </form>
                </section>
            ) : (
                <section className='login-to-container'>
                <h2>Please login to submit an idea</h2>
                <p><Link to="login">Login or Register</Link></p>
              </section>
            )}
        </div>
    )
}

export default AddIdea;