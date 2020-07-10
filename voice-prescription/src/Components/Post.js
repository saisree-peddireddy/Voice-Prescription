import React, { Component } from 'react'
import axios from 'axios'
import { Buffer } from 'buffer'
import base64 from 'base-64'
import Text from 'antd/lib/typography/Text'
import jwt_decode from 'jwt-decode';

export class PostList extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			posts:[]
		}
	}
	
		 
	render() {
		//var jwtDecode = require('jwt-decode');
		var token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ikw5ZGdMX19URmM3dkhPeFV3SnJNWCJ9.eyJpc3MiOiJodHRwczovL2Rldi1hemphZzBwNy51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDIxMDQzNjQyODg0OTgwMjE4MDUiLCJhdWQiOiI1aTZXbWQ3Qk1BTUx6OFFGU1Q5dUtmSDhwSnpCMEh5WiIsImlhdCI6MTU5MzI0MjY0NiwiZXhwIjoxNTkzMjc4NjQ2LCJhdF9oYXNoIjoiSDlienVDUzhWeHA3ZkNpLTZNbHEtQSIsIm5vbmNlIjoiSUh0eHRRbG0ycnRCZHh5SHNyLm14WkhJVndVbFZ4NkcifQ.RAvs0tXZi9-s72RcyaemGlcNaVKkLgU2HU5irYEVXLlM3m66Cqk0Ib2eahEbDqo1SOjoFEX2RqPR8m2X_VnFYpQdqjeGuNVUzSKO8zGed-TAJAsDSZQHWCZfHqL_bKwjkR7nIG29b7lW6g-n27XNiO-Bwd1-qT0abuB2L3d3S8hWH5s9w-JbKd6N5Ol6fBFV_Oo153Lh-7y4CJEgq1w1BAAIRAxTMfny25uoI1vC-SYT8L-xo2mjy2zQRbz7_m211B4QZxkHibRMwDrBxoGUO8LIGZ2Ty14kv1JrvUjFvFRyqUbEY7V4OsWUOoiDkYZyWaVIL9hb8-1zfYnZbadJHg';
		var decodedHeader = jwt_decode(token, { header: true });
		
		
		
		return (
			
			<h1>
				Hello
				{console.log(decodedHeader)}
			</h1>
			
			)
	}
}
export default PostList