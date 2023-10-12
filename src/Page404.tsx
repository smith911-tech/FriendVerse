import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button, Result } from "antd";
export default function Page404() {
  useEffect(() => {
    navigate("/Wrong-Link");
  }, []);
  const navigate = useNavigate();
  const handleBackHome = () => {
    navigate("/Home");
  };
  return (
    <div className="bg-[#111827] h-[120vh] text-[#ffffffc1] pt-15 pagenotfound">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button onClick={handleBackHome} type="primary">
            Back Home
          </Button>
        }
      />
    </div>
  );
}
