import { useState } from "react";

import { analyzeResume } from "../services/resumeService";

export function useResumeAnalysis() {

    const [loading, setLoading] = useState(false);

    const analyze = async (resumeText) => {

        try {

            setLoading(true);

            const data = await analyzeResume(

                resumeText

            );

            return data;

        }

        finally {

            setLoading(false);

        }

    };

    return {

        analyze,

        loading

    };

}