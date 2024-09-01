'use strict';

async function hae() {
  try {
    const response = await fetch('https://reqres.in/api/users/1');
    if (!response.ok) throw new Error('Error');

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('error');
  }
}

hae();
