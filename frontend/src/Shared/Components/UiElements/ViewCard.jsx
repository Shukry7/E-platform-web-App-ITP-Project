import * as React from "react";
import { useEffect } from 'react';
import "./ViewCard.css";
const ViewCard = () => {
    return (
        <div className="max-w-screen-md mx-auto min-h-screen flex justify-center items-center">
          <div className="sample_container card_sample">
            <div className="e-card e-custom-card relative mx-auto overflow-visible border rounded-lg shadow-md transition duration-200 border-gray-300 hover:border-indigo-500">
              <div className="e-card-header text-center">
                <div className="e-avatar e-avatar-circle e-avatar-xlarge ">
                  <img
                    src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                    alt="profile_pic"
                  />
                </div>
                &nbsp;
              </div>
              <div className="e-card-header">
                <div className="e-card-header-caption center">
                  <div className="e-card-header-title name text-lg font-semibold">
                    Laura Callahan
                  </div>
                  <div className="e-card-sub-title text-sm">Sales Coordinator</div>
                </div>
              </div>
              <div className="e-card-content">
                <p className="avatar-content">
                  Laura received a BA in psychology from the University of
                  Washington. She has also completed a course in business
                  French. She reads and writes French.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
};
export default ViewCard;