import React, { useState, useEffect } from "react";
import "./health.css";
import headerBackground from "./images/pexels-n-voitkevich-6941883.jpg";
import IsLoading from "./Navbar/IsLoading";
import Footer from "./Navbar/footer";
import ScrollProgressBar from "./Navbar/ScrollProgressBar";
import ScrollToTopButton from "./Navbar/ScrollToTopButton";
import ScrollIndicator from "./Navbar/ScrollIndicator";
import LogNavbar from "../lognavbar";

const Health = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <>
          <ScrollProgressBar />
          <ScrollIndicator />
          <LogNavbar/>

          <section className="intro-section">
            <div
              className="intro-section__background"
              style={{ backgroundImage: `url(${headerBackground})` }}
            />
            <div className="intro-section__content">
            <div>
  <h1>
    <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>Health Tips</span> <br />
    <span style={{ background: 'linear-gradient(to right, #00bcd4, #4caf50)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
      & Wellness Blog
    </span>
  </h1>
  <p>
    Discover practical health tips, the latest in diabetes research, and inspiring wellness stories. 
    Take charge of your well-being—one insight at a time.
  </p>
</div>
            </div>
          </section>

          <div className="health-blog">
            <h1 className="health-blog__title">Health & Wellness Blog</h1>

            <section className="blog-section health-tips">
  <h2 className="blog-section__heading">Health Tips</h2>
  
  <ul className="blog-section__list">
    <li className="blog-section__list-item">
      <span className="list-item__text">Stay active:</span> Aim for at least 30 minutes of moderate exercise, such as walking or cycling, daily to help regulate blood sugar levels.
    </li>
    <li className="blog-section__list-item">
      <span className="list-item__text">Eat a balanced diet rich in fiber and low in sugar:</span> Incorporate vegetables, whole grains, and lean proteins into your meals to promote stable glucose levels.
    </li>
    <li className="blog-section__list-item">
      <span className="list-item__text">Get enough sleep:</span> Ensure 7-9 hours of sleep each night to support your overall health and maintain hormonal balance, which is crucial for blood sugar control.
    </li>
    <li className="blog-section__list-item">
      <span className="list-item__text">Manage stress levels:</span> Chronic stress can elevate blood sugar. Try relaxation techniques like meditation, yoga, or deep breathing exercises.
    </li>
    <li className="blog-section__list-item">
      <span className="list-item__text">Drink water:</span> Staying hydrated is essential for overall health, and it helps keep your blood sugar levels in check.
    </li>
    <li className="blog-section__list-item">
      <span className="list-item__text">Monitor blood sugar:</span> Regularly check your blood sugar levels to understand how different foods and activities affect your health.
    </li>
    <li className="blog-section__list-item">
      <span className="list-item__text">Control portion sizes:</span> Overeating, even healthy foods, can spike blood sugar levels. Focus on portion control to maintain steady glucose levels.
    </li>
    <li className="blog-section__list-item">
      <span className="list-item__text">Include healthy fats:</span> Healthy fats like those found in avocados, nuts, and olive oil can improve insulin sensitivity.
    </li>
    <li className="blog-section__list-item">
      <span className="list-item__text">Quit smoking:</span> Smoking increases the risk of complications related to diabetes, including heart disease and nerve damage.
    </li>
    <li className="blog-section__list-item">
      <span className="list-item__text">Stay consistent with medications:</span> If prescribed medication for diabetes, be consistent in taking them as directed by your doctor for optimal management.
    </li>
  </ul>

  <p className="blog-section__note">
    Small, consistent changes in your daily habits can make a big difference in managing your diabetes and improving your overall health. 
    Start incorporating these tips into your routine and see how they can positively impact your life.
  </p>
</section>


            <section className="blog-section">
  <h2 className="blog-section__heading">Diabetes Research</h2>

  <article className="blog-section__article">
    <h3 className="blog-section__article-title">Latest Breakthroughs</h3>
    <p className="blog-section__text">
      Researchers have developed a non-invasive glucose monitoring device that uses sweat analysis. This could change the way diabetes is managed.
    </p>
  </article>
  <article className="blog-section__article">
    <h3 className="blog-section__article-title">Genetic Insights into Diabetes</h3>
    <p className="blog-section__text">
      Scientists have identified specific gene variants linked to Type 1 and Type 2 diabetes, helping to better understand individual risk factors and improve targeted therapies.
    </p>
  </article>

  <article className="blog-section__article">
    <h3 className="blog-section__article-title">Regenerative Cell Therapy</h3>
    <p className="blog-section__text">
      Clinical trials are exploring how pancreatic cell regeneration using stem cells could potentially restore insulin production in diabetic patients.
    </p>
  </article>

  <article className="blog-section__article">
    <h3 className="blog-section__article-title">Wearable Tech & Continuous Monitoring</h3>
    <p className="blog-section__text">
      Advancements in wearable technologies now allow continuous blood sugar tracking through skin sensors, making glucose management more efficient and real-time.
    </p>
  </article>
</section>


<section className="blog-section">
  <h2 className="blog-section__heading">Success Stories</h2>

  <blockquote className="blog-section__quote">
    "After being diagnosed with Type 2 diabetes, I changed my lifestyle. Now I run 5K every weekend and feel healthier than ever!" – Amanuel G.
  </blockquote>

  <blockquote className="blog-section__quote">
    "Monitoring my sugar levels daily and sticking to a healthy diet reversed my pre-diabetic condition." – Hana K.
  </blockquote>

  <blockquote className="blog-section__quote">
    "I never thought I could control my diabetes without medication, but with regular exercise and healthy eating, I've kept my blood sugar levels in check for over a year." – Jemma L.
  </blockquote>

  <blockquote className="blog-section__quote">
    "I struggled with obesity and Type 2 diabetes for years, but after adopting a plant-based diet and losing weight, my doctor said my diabetes is in remission!" – Mark T.
  </blockquote>

  <blockquote className="blog-section__quote">
    "With the support of my healthcare team and a personalized fitness plan, I reduced my medication, and I feel more energetic than I have in years." – Sarah W.
  </blockquote>

  <blockquote className="blog-section__quote">
    "I was on the verge of being insulin-dependent, but through a consistent workout regimen and mindfulness, my blood sugar levels improved drastically." – Lucas D.
  </blockquote>

  <p className="blog-section__note">
    These inspiring stories show that with the right tools and mindset, managing diabetes is possible. Share your success story with us to inspire others!
  </p>
</section>

          </div>

          <Footer />
          <ScrollToTopButton />
        </>
      )}
    </>
  );
};

export default Health;