import React from 'react';
import { Hero } from '../components/home/Hero';
import { FeaturedEvents } from '../components/home/FeaturedEvents';
import { ValuePropositions } from '../components/home/ValuePropositions';
import { CallToAction } from '../components/home/CallToAction';

export const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedEvents />
      <ValuePropositions />
      <CallToAction />
    </div>
  );
};
